export const popup = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 5,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 5,
  },
}
export const popupLeft = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
}
export const popup3 = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
}

export const hide = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}
export const hide2 = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
  },
}

export const popup2 = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0 },
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: { duration: 0.3 },
  },
}
export const slidePopup = {
  hidden: {
    opacity: 0,
    y: -30,
    transition: { duration: 0 },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.1 },
  },
}
export const show = {
  hidden: {
    opacity: 0,
    x: "-5%",
    transition: { duration: 0 },
  },
  show: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    x: "-5%",
    opacity: 0,
    transition: { duration: 0.2 },
  },
}
