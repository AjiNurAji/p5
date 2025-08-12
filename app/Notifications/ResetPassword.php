<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPassword extends Notification
{
  public $token;

  /**
   * Create a new notification instance.
   */
  public function __construct($token)
  {
    $this->token = $token;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via(object $notifiable): array
  {
    return ['mail'];
  }

  /**
   * Get the mail representation of the notification.
   */
  public function toMail(object $notifiable): MailMessage
  {

    $user = $notifiable;

    $resetUrl = url(route('password.reset', [
      'token' => $this->token,
      'email' => $notifiable->getEmailForPasswordReset(),
    ], false));

    $count = config('auth.passwords.' . config('auth.defaults.passwords') . '.expire');

    return (new MailMessage)
      ->subject("Atur Ulang Kata Sandi Anda 🔐")
      ->view("emails.reset-password", compact("user", "resetUrl", "count"));
  }

  /**
   * Get the array representation of the notification.
   *
   * @return array<string, mixed>
   */
  public function toArray(object $notifiable): array
  {
    return [
      //
    ];
  }
}
