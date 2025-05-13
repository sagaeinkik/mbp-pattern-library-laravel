php_executable=$1

"$php_executable" artisan queue:restart

if [[ $("$php_executable" artisan list) =~ "horizon:terminate" ]]; then
  echo "Restarting Laravel Horizon."

  "$php_executable" artisan horizon:terminate
fi

echo "optimize:clear"
"$php_executable" artisan optimize:clear

echo "Restarting PHP-FPM."
sudo systemctl reload php8.2-fpm
