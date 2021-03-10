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
