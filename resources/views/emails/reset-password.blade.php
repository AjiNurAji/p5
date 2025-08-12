<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Kata Sandi</title>
    <style>
        :root {
            --background: oklch(1 0 0);
            --foreground: oklch(0.145 0 0);
            --card: oklch(1 0 0);
            --card-foreground: oklch(0.145 0 0);
            --primary: oklch(0.205 0 0);
            --primary-foreground: oklch(0.985 0 0);
            --muted: oklch(0.97 0 0);
            --muted-foreground: oklch(0.556 0 0);
            --accent: oklch(0.97 0 0/10%);
            --accent-foreground: oklch(0.205 0 0);
            --destructive: oklch(0.577 0.245 27.325);
            --destructive-foreground: oklch(0.577 0.245 27.325);
            --border: oklch(0.922 0 0);
        }


        @media (prefers-color-scheme: dark) {
            :root {
                --background: oklch(0.145 0 0);
                --foreground: oklch(0.985 0 0);
                --card: oklch(0.205 0 0);
                --card-foreground: oklch(0.985 0 0);
                --primary: oklch(0.922 0 0);
                --primary-foreground: oklch(0.205 0 0);
                --muted: oklch(0.269 0 0);
                --muted-foreground: oklch(0.708 0 0);
                --accent: oklch(0.97 0 0/4%);
                --accent-foreground: oklch(0.985 0 0);
                --destructive: oklch(0.396 0.141 25.723);
                --destructive-foreground: oklch(0.637 0.237 25.331);
                --border: oklch(1 0 0/10%);
            }
        }

        body {
            background-color: var(--background);
            color: var(--foreground);
        }

        * {
            font-family: "Instrument Sans", ui-sans-serif, system-ui, sans-serif,
                "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }

        #button {
            text-decoration: none;
            background-color: var(--primary);
            color: var(--primary-foreground);
            padding: 10px 15px;
            border-radius: 10px;
        }

        .footer p {
            font-size: 12px;
        }

        @media screen and (max-width: 600px) {
            .content {
                width: 100% !important;
                display: block !important;
                padding: 10px !important;
            }

            .header,
            .body,
            .footer {
                padding: 20px !important;
            }

            .header span {
                font-size: 18px;
            }

            * {
                font-size: 12px;
            }

            ::selection {
                background-color: var(--foreground);
                color: var(--background);
            }

            .footer p {
                font-size: 10px;
            }
        }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Tangerine:wght@400;700&display=swap"
        rel="stylesheet">
</head>

<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table class="content" width="600" border="0" cellspacing="0" cellpadding="0"
                    style="border-collapse: collapse; border: 1px solid var(--border); background-color: var(--card);">
                    <!-- Header -->
                    <tr>
                        <td class="header"
                            style="padding: 20px; text-align: center; color: var(--accent-foreground) !important; font-size: 24px; background-color: var(--accent)">
                            <img src="https://p5.ajinuraji.my.id/storage/avatars/5173-1754921359.jpg" alt="logo"
                                style="width: 70px; height: 70px; border-radius: 99999px;" />
                            <span style="display: block;">Reset Kata Sandi</span>
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                            <p>Hai 👋, {{ $user->name }}</p>
                            <p>Kami menerima permintaan reset kata sandi untuk akun anda. Klik tombol di bawah untuk
                                melanjutkan proses:</p>
                        </td>
                    </tr>

                    <!-- Call to action Button -->
                    <tr>
                        <td style="padding: 0px 40px; text-align: center;">
                            <!-- CTA Button -->
                            <table cellspacing="0" cellpadding="0" style="margin: auto;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $resetUrl }}" target="_blank" id="button">Reset Kata
                                            Sandi</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td class="body"
                            style="padding: 30px; text-align: left; font-size: 16px; line-height: 1.6; border-bottom: 1px solid var(--border)">
                            <p>Jika anda tidak meminta reset kata sandi, abaikan email ini. Tautan ini akan kadaluarsa
                                dalam {{ $count }} menit.</p>
                            <p>Terimakasih,
                                <br><strong>{{ config('app.name') }}</strong>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="body"
                            style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6; color: var(--muted-foreground)">
                            <p>Jika anda memiliki kesulitan menekan tombol "Reset Kata Sandi", salin dan tempel URL
                                berikut ke browser:
                                <a href="{{ $resetUrl }}" target="_blank"
                                    style="color: var(--destructive)">{{ $resetUrl }}</a>
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td class="footer"
                            style="background-color: var(--accent); padding: 40px; text-align: center; color: var(--accent-foreground);">
                            <p>&copy; {{ date('Y') }} Pioneers Five. All Right Reversed.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
