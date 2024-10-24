const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)

  return date.toLocaleString()
}

export default formatTimestamp
