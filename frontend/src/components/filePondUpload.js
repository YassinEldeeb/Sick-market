import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
)
const FilePondUpload = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.userInfo)

  const [numUpload, setNumUpload] = useState(0)

  const filesState = () => {
    if (user) {
      if (user.availablePic) {
        if (user.profilePicLink && user.profilePicLink !== 'cleared') {
          return [{ source: `${user.profilePicLink}` }]
        } else {
          return [
            {
              source: `https://sickmarket.ml/api/users/profilePic/${user._id}`,
            },
          ]
        }
      } else {
        return [
          {
            source: `https://sickmarket.ml/api/users/profilePic/${user._id}`,
          },
        ]
      }
    } else {
      return []
    }
  }
  const [files, setFiles] = useState(filesState())

  useEffect(() => {
    if (!user.availablePic) {
      setNumUpload(0)
      setFiles([
        {
          source: `https://sickmarket.ml/api/users/profilePic/${
            user._id
          }?${new Date().getTime()}`,
        },
      ])
    }
  }, [user.availablePic, user._id])

  const [uploadIcon, setUploadIcon] = useState(false)

  const serverProp = () => {
    if (numUpload >= 1) {
      setUploadIcon(true)
    } else {
      setUploadIcon(false)
    }
  }
  useEffect(() => {
    serverProp()
  }, [numUpload])

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
        instantUpload={false}
        imageResizeTargetWidth='200'
        imageResizeTargetHeight='200'
        imageCropAspectRatio='1:1'
        imagePreviewHeight='170'
        accept='image/png, image/jpeg, image/gif'
        maxFileSize='5MB'
        name='files'
        labelIdle='Drag & Drop your Image or <span class="browseTextFilePond">Browse</span>'
        iconRemove={`<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M106.242 70.7541L129.246 93.7576L79.2946 143.709L58.7851 145.973C56.0395 146.277 53.7197 143.955 54.0252 141.21L56.3072 120.686L106.242 70.7541V70.7541ZM143.474 67.3292L132.673 56.5282C129.303 53.1591 123.839 53.1591 120.47 56.5282L110.309 66.6895L133.312 89.6931L143.474 79.5318C146.843 76.1609 146.843 70.6984 143.474 67.3292V67.3292Z" fill="white"/>
<defs>
<clipPath id="clip0">
<rect width="92" height="92" fill="white" transform="translate(54 54)"/>
</clipPath>
</defs>
</svg>
`}
        onupdatefiles={() => setNumUpload(numUpload + 1)}
        server={
          uploadIcon
            ? {
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
                  formData.append('profilePic', file)

                  const request = new XMLHttpRequest()
                  request.open(
                    'POST',
                    'https://sickmarket.ml/api/users/me/profilePic'
                  )
                  request.setRequestHeader('Authorization', `Bearer ${token}`)
                  request.upload.onprogress = (e) => {
                    progress(e.lengthComputable, e.loaded, e.total)
                  }
                  request.onload = function () {
                    if (request.status >= 200 && request.status < 300) {
                      // the load method accepts either a string (id) or an object
                      load(request.responseText)
                    } else {
                      // Can call the error method if something is wrong, should exit after
                      error('oh no')
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
              }
            : null
        }
        onprocessfile={() => {
          dispatch({
            type: 'PROFILE_PIC_UPLOADED',
          })

          document.querySelector('#profileIMG').src =
            user.profilePicLink && user.profilePicLink !== 'cleared'
              ? user.profilePicLink
              : `https://sickmarket.ml/api/users/profilePic/${user._id}?` +
                new Date().getTime()

          document.querySelector('.profile-mobile-pic img').src =
            user.profilePicLink && user.profilePicLink !== 'cleared'
              ? user.profilePicLink
              : `https://sickmarket.ml/api/users/profilePic/${user._id}?` +
                new Date().getTime()
        }}
      />
    </>
  )
}

export default FilePondUpload
