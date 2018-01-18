<?php

namespace App\Http\Proxy;

use GuzzleHttp\Client;

class TokenProxy
{
    protected $http;

    /**
     * TokenProxy constructor.
     * @param $http
     */
    public function __construct(Client $http)
    {
        $this->http = $http;
    }

    public function proxy($grant_type, array $data = [])
    {
        $data = array_merge($data, [
            'client_id'     => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'grant_type'    => $grant_type,
        ]);
        $response = $this->http->post('http://spa.test/oauth/token', [
            'form_params' => $data,
        ]);

        $token = json_decode((string)$response->getBody(), true);

        return response()->json([
            'token'      => $token['access_token'],
            'expires_in' => $token['expires_in'],
            'auth_id'    => md5($token['access_token']),
        ])->cookie('refresh_token', $token['refresh_token'], 14400, null, null, false, true);
    }

    public function login($email, $password)
    {
        if (auth()->attempt(['email' => $email, 'password' => $password, 'is_active' => 1])) {
            return $this->proxy('password', [
                'username' => $email,
                'password' => $password,
                'scope'    => '',
            ]);
        }
        return response()->json([
            'status'  => false,
            'message' => '账户未激活',
        ], 421);
    }

    public function logout()
    {
        $user = auth()->guard('api')->user();
        if ($user) {
            $accessToken = $user->token();

            app('db')->table('oauth_refresh_tokens')
                ->where('access_token_id', $accessToken->id)
                ->update([
                    'revoked' => true,
                ]);

            $accessToken->revoke();
        }

        //删除 cookie
        app('cookie')->queue(app('cookie')->forget('refresh_token'));

        return response()->json([
            'message' => 'Logout',
        ], 204);

    }

    public function refresh()
    {
        $refreshToken = request()->cookie('refresh_token');
        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken,
        ]);
    }
}