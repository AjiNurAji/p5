<x-mail::layout>

    <!-- Body -->
    <tr>
        <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
            <p>Hai 👋, {{ $user->name }}</p>
            <p>Kami menerima permintaan reset kata sandi untuk akun anda. Klik tombol di bawah untuk
                melanjutkan proses:</p>
        </td>
    </tr>

    <!-- Call to action Button -->
    <x-mail::button :url="$resetUrl">
      Reset Kata Sandi
    </x-mail::button>


    <tr>
        <td class="body"
            style="padding: 30px; text-align: left; font-size: 16px; line-height: 1.6; border-bottom: 1px solid var(--border)">
            <p>Jika anda tidak meminta reset kata sandi, abaikan email ini. Tautan ini akan kadaluarsa
                dalam 60 menit.</p>
            <p>Terimakasih,
                <br><strong>{{ config('app.name') }}</strong>
            </p>
        </td>
    </tr>


    <x-slot:subcopy>
        <tr>
            <td class="body"
                style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6; color: var(--muted-foreground)">
                <p>Jika anda memiliki kesulitan menekan tombol "@yield('button-text')", salin dan tempel URL
                    berikut ke browser:
                    <a href="@yield('copy-link')" target="_blank" style="color: var(--destructive)">@yield('copy-link')</a>
                </p>
            </td>
        </tr>
    </x-slot:subcopy>
</x-mail::layout>
