import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FilePond, registerPlugin, FileStatus } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
)
const FilePondUpload = () => {
  const dispatch = useDispatch()
  const { user, token, deleteProfilePicLoading } = useSelector(
    (state) => state.userInfo
  )

  const [files, setFiles] = useState(
    user ? [{ source: `/api/users/profilePic/${user._id}` }] : []
  )
  useEffect(() => {
    if (!deleteProfilePicLoading) {
      setFiles([
        { source: `/api/users/profilePic/${user._id}?${new Date().getTime()}` },
      ])
    }
  }, [deleteProfilePicLoading])

  return (
    <>
      <FilePond
        files={files}
        dropOnPage
        dropValidation
        acceptedFileTypes='image/png, image/jpeg, image/gif'
        stylePanelLayout='compact circle'
        styleLoadIndicatorPosition='center bottom'
        styleProgressIndicatorPosition='right bottom'
        styleButtonRemoveItemPosition='left bottom'
        styleButtonProcessItemPosition='right bottom'
        instantUpload='false'
        imageResizeTargetWidth='200'
        imageResizeTargetHeight='200'
        imageCropAspectRatio='1:1'
        imagePreviewHeight='170'
        accept='image/png, image/jpeg, image/gif'
        maxFileSize='5MB'
        imageEditEditor
        name='files'
        labelIdle='Drag & Drop your Image or <span class="browseTextFilePond">Browse</span>'
        server={{
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
            transfer,
            options
          ) => {
            const formData = new FormData()
            formData.append("profilePic", file)

            const request = new XMLHttpRequest()
            request.open("POST", "/api/users/me/profilePic")
            request.setRequestHeader("Authorization", `Bearer ${token}`)
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total)
            }
            request.onload = function () {
              if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object
                load(request.responseText)
              } else {
                // Can call the error method if something is wrong, should exit after
                error("oh no")
              }
            }
            request.send(formData)
            return {
              abort: () => {
                // This function is entered if the user has tapped the cancel button
                request.abort()

                // Let FilePond know the request has been cancelled
                abort()
              },
            }
          },
        }}
        onprocessfile={() => {
          dispatch({
            type: "PROFILE_PIC_UPLOADED",
          })
          document.querySelector(".profilePic img").src =
            `/api/users/profilePic/${user._id}?` + new Date().getTime()
        }}
      />
    </>
  )
}

export default FilePondUpload
