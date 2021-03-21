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