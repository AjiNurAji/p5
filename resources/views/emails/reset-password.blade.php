<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Kata Sandi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Tangerine:wght@400;700&display=swap"
        rel="stylesheet">
</head>

<body
    style="margin:0; padding:0; background-color:#ffffff; color:#252525; font-family:'Instrument Sans',ui-sans-serif,system-ui,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:20px;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0"
                    style="border-collapse:collapse; border:1px solid #ebebeb; background-color:#ffffff;">
                    <!-- Header -->
                    <tr>
                        <td
                            style="padding:20px; text-align:center; color:#343434; font-size:24px; background-color:#f7f7f7;">
                            <img src="https://p5.ajinuraji.my.id/storage/avatars/5173-1754921359.jpg" alt="logo"
                                style="width:70px; height:70px; border-radius:99999px;" />
                            <span style="display:block;">Reset Kata Sandi</span>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding:40px; text-align:left; font-size:16px; line-height:1.6; color:#252525;">
                            <p>Hai 👋, {{ $user->name }}</p>
                            <p>Kami menerima permintaan reset kata sandi untuk akun anda. Klik tombol di bawah untuk
                                melanjutkan proses:</p>
                        </td>
                    </tr>

                    <!-- Call to action Button -->
                    <tr>
                        <td style="padding:0 40px; text-align:center;">
                            <table cellspacing="0" cellpadding="0" style="margin:auto;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $resetUrl }}" target="_blank"
                                            style="display:inline-block; text-decoration:none; background-color:#343434; color:#fbfbfb; padding:10px 15px; border-radius:10px; font-weight:bold;">
                                            Reset Kata Sandi
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Extra Info -->
                    <tr>
                        <td
                            style="padding:30px; text-align:left; font-size:16px; line-height:1.6; color:#252525; border-bottom:1px solid #ebebeb;">
                            <p>Jika anda tidak meminta reset kata sandi, abaikan email ini. Tautan ini akan kadaluarsa
                                dalam {{ $count }} menit.</p>
                            <p>Terimakasih,<br><strong>{{ config('app.name') }}</strong></p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:40px; text-align:left; font-size:16px; line-height:1.6; color:#8e8e8e;">
                            <p>Jika anda memiliki kesulitan menekan tombol "Reset Kata Sandi", salin dan tempel URL
                                berikut ke browser:
                                <a href="{{ $resetUrl }}" target="_blank"
                                    style="color:#ba3732;">{{ $resetUrl }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color:#f7f7f7; padding:40px; text-align:center; color:#343434; font-size:12px;">
                            <p>&copy; {{ date('Y') }} Pioneers Five. All Right Reversed.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
