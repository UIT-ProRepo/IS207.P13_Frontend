const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div className="page-content">{children}</div>
}

export default RootLayout
