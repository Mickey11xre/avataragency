param([int]$Port = 4599, [string]$Root = "C:\Dev\avataragency")
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"
$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript";
  ".json"="application/json"; ".png"="image/png"; ".jpg"="image/jpeg";
  ".jpeg"="image/jpeg"; ".svg"="image/svg+xml"; ".ico"="image/x-icon";
  ".txt"="text/plain"; ".xml"="application/xml"; ".webp"="image/webp";
  ".mp4"="video/mp4"; ".webm"="video/webm"; ".mov"="video/quicktime"
}
while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }
    $path = Join-Path $Root $rel
    if ((Test-Path $path) -and -not (Get-Item $path).PSIsContainer) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ctx.Response.ContentType = ($mime[$ext]) ? $mime[$ext] : "application/octet-stream"
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $b = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rel")
      $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    }
    $ctx.Response.OutputStream.Close()
  } catch { }
}
