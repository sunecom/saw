#!/bin/bash
# SAW 健康检查 - 如果网站无响应则自动重启服务
URL="https://saw.aitomoney.online/"
TIMEOUT=10

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$URL")

if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "301" ] && [ "$HTTP_CODE" != "302" ]; then
    echo "$(date): Health check failed (HTTP $HTTP_CODE). Restarting saw.service..."
    systemctl restart saw.service
    echo "$(date): Service restarted."
fi
