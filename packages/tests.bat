@echo off

cls

if "%~1" == "" ( 
   for /R %%f in (*.test.ts) do (
      echo %%f | findstr /V "node_modules" | findstr /V "temp" >nul
      if not errorlevel 1 (
         rem Ignora arquivos que terminam com .js
         echo %%f | findstr /E /I ".js" >nul
         if errorlevel 1 (
               echo Executando teste: %%f
               bun test "%%f"
         )
      )
   )
) else ( bun test %~1 )

taskkill /IM bun.exe /F >nul