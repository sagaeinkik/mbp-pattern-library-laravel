php_executable=$1

"$php_executable" artisan storage:link

"$php_executable" artisan config:cache

"$php_executable" artisan route:cache

"$php_executable" artisan view:cache

app_env=$("$php_executable" artisan tinker --execute "echo config('app.env')")

redis_id=$("$php_executable" artisan tinker --execute "echo config('database.redis.cache.database')")

# if [[ -z "$redis_id" ]]; then
#     echo "Redis is not configured for the cache driver. Skipping cache flush."
# else
#         echo "Flushing Redis cache database $redis_id."
#     redis-cli -n "$redis_id" flushdb
# fi

"$php_executable" artisan migrate --force

