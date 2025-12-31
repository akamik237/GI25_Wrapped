# Script de compression vidéo avec FFmpeg
# Ce script compresse toutes les vidéos dans public/ pour réduire leur taille

Write-Host "🎬 Script de compression vidéo" -ForegroundColor Cyan
Write-Host ""

# Vérifier si FFmpeg est installé
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegPath) {
    Write-Host "❌ FFmpeg n'est pas installé !" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Options d'installation :" -ForegroundColor Yellow
    Write-Host "1. Via Chocolatey (recommandé) :" -ForegroundColor White
    Write-Host "   choco install ffmpeg" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Via winget :" -ForegroundColor White
    Write-Host "   winget install ffmpeg" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Téléchargement manuel :" -ForegroundColor White
    Write-Host "   https://ffmpeg.org/download.html" -ForegroundColor Gray
    Write-Host "   (Extraire et ajouter au PATH)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Alternative en ligne (sans installation) :" -ForegroundColor White
    Write-Host "   https://www.freeconvert.com/video-compressor" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host "✅ FFmpeg trouvé : $($ffmpegPath.Source)" -ForegroundColor Green
Write-Host ""

# Paramètres de compression LÉGÈRE (qualité préservée)
$crf = 20  # Qualité (18-28, plus bas = meilleure qualité) - 20 = haute qualité
$preset = "slow"  # Vitesse de compression (plus lent = meilleure compression à même qualité)
$maxWidth = 1920  # Largeur max (1080p)
$maxHeight = 1080  # Hauteur max
$audioBitrate = "192k"  # Bitrate audio (plus élevé = meilleure qualité son)

Write-Host "⚙️  Paramètres de compression LÉGÈRE (qualité préservée) :" -ForegroundColor Cyan
Write-Host "   CRF: $crf (haute qualité - 20 = excellent)" -ForegroundColor Gray
Write-Host "   Preset: $preset (compression optimale)" -ForegroundColor Gray
Write-Host "   Résolution max: ${maxWidth}x${maxHeight}" -ForegroundColor Gray
Write-Host "   Audio: $audioBitrate (qualité sonore)" -ForegroundColor Gray
Write-Host ""

# Créer un dossier pour les vidéos compressées
$backupDir = "public-compressed"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "📁 Dossier créé : $backupDir" -ForegroundColor Green
}

# Trouver toutes les vidéos
$videoExtensions = @("*.mp4", "*.MP4", "*.MOV", "*.mov")
$videos = Get-ChildItem -Path "public" -Recurse -Include $videoExtensions

Write-Host "📹 Trouvé $($videos.Count) vidéo(s) à compresser" -ForegroundColor Cyan
Write-Host ""

$totalOriginalSize = 0
$totalCompressedSize = 0
$processed = 0

foreach ($video in $videos) {
    $processed++
    $relativePath = $video.FullName.Replace((Get-Location).Path + "\", "")
    $originalSize = [math]::Round($video.Length / 1MB, 2)
    $totalOriginalSize += $originalSize
    
    Write-Host "[$processed/$($videos.Count)] Compressing: $relativePath" -ForegroundColor Yellow
    Write-Host "   Taille originale: ${originalSize} MB" -ForegroundColor Gray
    
    # Créer la structure de dossiers dans le dossier compressé
    $outputPath = Join-Path $backupDir $relativePath
    $outputDir = Split-Path $outputPath -Parent
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    # Commande FFmpeg pour compression LÉGÈRE (qualité préservée)
    $ffmpegArgs = @(
        "-i", "`"$($video.FullName)`"",
        "-c:v", "libx264",
        "-crf", $crf,
        "-preset", $preset,
        "-vf", "scale='if(gt(iw,ih),min($maxWidth,iw),-1)':'if(gt(iw,ih),-1,min($maxHeight,ih))'",
        "-c:a", "aac",
        "-b:a", $audioBitrate,
        "-movflags", "+faststart",
        "-y",
        "`"$outputPath`""
    )
    
    # Exécuter FFmpeg
    $process = Start-Process -FilePath "ffmpeg" -ArgumentList $ffmpegArgs -NoNewWindow -Wait -PassThru
    
    if ($process.ExitCode -eq 0 -and (Test-Path $outputPath)) {
        $compressedSize = [math]::Round((Get-Item $outputPath).Length / 1MB, 2)
        $totalCompressedSize += $compressedSize
        $savings = [math]::Round((1 - ($compressedSize / $originalSize)) * 100, 1)
        
        Write-Host "   ✅ Compressé: ${compressedSize} MB (économie: ${savings}%)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Erreur lors de la compression" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 Résumé de la compression :" -ForegroundColor Cyan
Write-Host "   Taille totale originale: $([math]::Round($totalOriginalSize, 2)) MB" -ForegroundColor White
Write-Host "   Taille totale compressée: $([math]::Round($totalCompressedSize, 2)) MB" -ForegroundColor White
Write-Host "   Économie totale: $([math]::Round((1 - ($totalCompressedSize / $totalOriginalSize)) * 100, 1))%" -ForegroundColor Green
Write-Host ""

Write-Host "📝 Prochaines étapes :" -ForegroundColor Yellow
Write-Host "1. Vérifiez la qualité des vidéos dans '$backupDir'" -ForegroundColor White
Write-Host "2. Si satisfait, remplacez les originaux :" -ForegroundColor White
Write-Host "   Get-ChildItem -Path '$backupDir' -Recurse -File | ForEach-Object {" -ForegroundColor Gray
Write-Host "       `$dest = `$_.FullName.Replace('$backupDir', 'public')" -ForegroundColor Gray
Write-Host "       Copy-Item `$_.FullName `$dest -Force" -ForegroundColor Gray
Write-Host "   }" -ForegroundColor Gray
Write-Host "3. Supprimez le dossier backup : Remove-Item -Recurse -Force '$backupDir'" -ForegroundColor White
Write-Host ""

