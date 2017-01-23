@echo off

echo =======================================================
echo.
echo アドオンマネージャー　情報初期化ツール
echo ・アドオンマネージャーのインストール状況などの設定情報を初期化します
echo 　ToS再インストールしたけどアドオンマネージャーにインストール情報が
echo 　残ってる、といった時にご使用ください。
echo 　(設定フォルダである
echo 　 %APPDATA%\tree-of-savior-addon-manager
echo 　 のフォルダを削除します)
echo.
echo ※ToS内のアドオンの削除は実施しません
echo 　あくまでも、アドオンマネージャーの情報を初期化します。
echo =======================================================
echo.
if not exist %APPDATA%\tree-of-savior-addon-manager (
	echo ・・・と思いましたが、削除する情報がありません。
	echo おめでとうございます、既に初期化されていました。
	echo.
	echo 何かキーを押すと終了します。
	pause >NUL 2>&1
	exit
)
echo 消去する場合は、yかYを押して処理を続行してください。
echo.

: INPUTMODE
set input=
set /p input="処理を続行してもよろしいですか？(Y/N): "
if /i "%input%"=="y" (
	goto PROCESS
) else if /i "%input%"=="n" (
	echo.
	echo Nが入力されたので終了します。
	echo.
	echo 何かキーを押すと終了します。
	pause >NUL 2>&1
	exit
) else (
	goto INPUTMODE
)


: PROCESS

echo.
echo アドオンマネージャー情報を初期化します。
rmdir /s /q %APPDATA%\tree-of-savior-addon-manager >NUL 2>&1
echo.
echo 初期化が完了しました！
echo.
echo 何かキーを押すと終了します。
pause >NUL 2>&1
exit
