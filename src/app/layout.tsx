export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}
