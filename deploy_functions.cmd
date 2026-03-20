@echo off
echo ==============================================
echo Iniciando deploy das funcoes no Supabase...
echo Isso vai requerer que voce faca o login na sua conta
echo e que ja tenha inicializado ("npx supabase link") o projeto localmente.
echo ==============================================


echo.
echo === IMPLANTANDO CREATE-PAYMENT ===
call npx.cmd supabase functions deploy create-payment

echo.
echo === IMPLANTANDO PAYMENT-STATUS ===
call npx.cmd supabase functions deploy payment-status

echo.
echo === IMPLANTANDO ASAAS-WEBHOOK ===
call npx.cmd supabase functions deploy asaas-webhook

echo.
echo Processo concluido! Caso tenha falhado, verifique se seu Docker
echo ou Supabase CLI estao corretamente instalados e vinculados.
pause
