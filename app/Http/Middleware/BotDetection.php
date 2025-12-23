<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class BotDetection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $agent = new Agent();
        $userAgent = $request->header('User-Agent', '');

        // List of known bot/crawler user agents
        $botPatterns = [
            'googlebot',
            'bingbot',
            'slurp',
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'facebookexternalhit',
            'twitterbot',
            'linkedinbot',
            'whatsapp',
            'telegrambot',
            'applebot',
            'crawler',
            'spider',
            'bot',
            'scraper'
        ];

        $isBot = false;

        // Check if user agent contains any bot patterns
        foreach ($botPatterns as $pattern) {
            if (stripos($userAgent, $pattern) !== false) {
                $isBot = true;
                break;
            }
        }

        // Also check using Agent library
        if (!$isBot && $agent->isRobot()) {
            $isBot = true;
        }

        // Add bot detection flag to request
        $request->merge(['is_bot' => $isBot]);

        return $next($request);
    }
}
