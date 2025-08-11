<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class ResetPassword extends Notification
{
  use Queueable;
  public $token;

  /**
   * Create a new notification instance.
   */
  public function __construct(string $token)
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

    $resetLink = URL::temporarySignedRoute("password.reset", now()->addMinute(60), [
      "token" => $this->token,
    ]);

    return (new MailMessage)
      ->subject("Atur Ulang Kata Sandi Anda 🔐")
      ->view("emails.reset-password", [
        "user" => $notifiable,
        "resetLink" => $resetLink,
      ]);
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
