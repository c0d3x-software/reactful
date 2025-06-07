@REM deno run -A deploy.js

set "ORIGIN=B:\Repositorios\reactful\document"
set "TARGET=B:\Repositorios\jsenaribeiro.github.io"

if not exist "%TARGET%\documentation" md "%TARGET%\documentation"
if not exist "%TARGET%\presentation" md "%TARGET%\presentation"
if not exist "%TARGET%\publication" md "%TARGET%\publication"

xcopy %ORIGIN% %TARGET%\documentation\ /y /e
xcopy %ORIGIN% %TARGET%\documentation\ /y /s /e
xcopy %ORIGIN%\slide %TARGET%\presentation\ /y /s /e
xcopy %ORIGIN%\article %TARGET%\publication\ /y /s /e

del /s /q %TARGET%\*.md
del /s /q %TARGET%\deploy.*

cd ../../jsenaribeiro.github.io

git add .
git commit -m 'doc....'
git push

cd %ORIGIN%