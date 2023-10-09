namespace NotifyService.Services
{
    public interface IMailService
    {
        bool SendMail(MailData mailData);
    }
}
