@props(['url'])

<tr>
    <td style="padding: 0px 40px; text-align: center;">
        <!-- CTA Button -->
        <table cellspacing="0" cellpadding="0" style="margin: auto;">
            <tr>
                <td align="center">
                    <a href="{{ $url }}" target="_blank" id="button">{{$slot}}</a>
                </td>
            </tr>
        </table>
    </td>
</tr>
