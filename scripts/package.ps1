$ErrorActionPreference = 'Stop'
$pluginRoot = Split-Path -Parent $PSScriptRoot
Push-Location $pluginRoot
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
    $version = (Get-Content manifest.json -Raw | ConvertFrom-Json).version
    $releaseFiles = @('index.html', 'manifest.json', 'plugin.js', 'THIRD_PARTY_NOTICES.md') | ForEach-Object { Join-Path $pluginRoot "dist/$_" }
    Compress-Archive -LiteralPath $releaseFiles -DestinationPath (Join-Path $pluginRoot "archived-viewer-plugin-$version.zip") -Force
} finally {
    Pop-Location
}
