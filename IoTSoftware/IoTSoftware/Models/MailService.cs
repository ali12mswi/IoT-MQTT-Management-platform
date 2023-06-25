using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace IoTSoftware.Models
{
    public static class MailService
    {
        public static async Task CheckThresholdAsync(string topic, string message)
        {
            try
            {
                // Retrieve the mail rule from the database based on the topic
                MailRule rule = await GetMailRuleFromDatabase(topic);

                if (rule != null)
                {
                    // Check the threshold and send email if exceeded
                    if (await CheckThresholdExceeded(rule, message))
                    {
                        string emailBody = $"The threshold has been exceeded for the topic: {topic}";
                        await SendEmailAsync(rule.EmailAddress, rule.EmailSubject, emailBody);
                        rule.LastTriggeredAt = DateTime.Now; // Update the last triggered timestamp

                        // Update the last triggered timestamp in the database
                        await UpdateLastTriggeredTimestampInDatabase(rule);
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle the exception or log it for debugging
                Console.WriteLine($"An error occurred: {ex.Message}");
                // You can also log the exception using a logging framework such as Serilog or NLog
            }
        }


        private static async Task<MailRule> GetMailRuleFromDatabase(string topic)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["cs"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();



                using (SqlCommand command = new SqlCommand("SpGetRule", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@topic", topic);

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            MailRule rule = new MailRule
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                Topic = reader["Topic"].ToString(),
                                ThresholdValue = Convert.ToDouble(reader["ThresholdValue"]),
                                Operator = (Operator)(Convert.ToInt32(reader["Operator"])),
                                EmailAddress = reader["EmailAddress"].ToString(),
                                EmailSubject = reader["EmailSubject"].ToString(),
                                EmailBody = reader["EmailBody"].ToString(),
                                LastTriggeredAt = Convert.IsDBNull(reader["LastTriggeredAt"]) ? default(DateTime) : (DateTime)reader["LastTriggeredAt"]
                            };
                            MailRule r = rule;
                            return rule;
                        }
                    }
                }
            }

            return null;
        }

        private static async Task<bool> CheckThresholdExceeded(MailRule rule, string message)
        {
            return await Task.Run(() =>
            {
                // Convert the message to a number
                if (double.TryParse(message, out double messageValue))
                {
                    // Check the threshold based on the operator
                    switch (rule.Operator)
                    {
                        case Operator.equal:
                            return messageValue == rule.ThresholdValue;
                        case Operator.greaterThan:
                            return messageValue > rule.ThresholdValue;
                        case Operator.lessThan:
                            return messageValue < rule.ThresholdValue;
                        case Operator.greaterThanOrEqual:
                            return messageValue >= rule.ThresholdValue;
                    }
                }

                return false;
            });
        }



        private static async Task SendEmailAsync(string toAddress, string subject, string body)
        {
            string smtpServer = ConfigurationManager.AppSettings["SMTPServer"];
            int smtpPort = Convert.ToInt32(ConfigurationManager.AppSettings["SMTPPort"]);
            string smtpUsername = ConfigurationManager.AppSettings["SMTPUsername"];
            string smtpPassword = ConfigurationManager.AppSettings["SMTPPassword"];

            using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                using (MailMessage mailMessage = new MailMessage(smtpUsername, toAddress))
                {
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;

                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
        }

        private static async Task UpdateLastTriggeredTimestampInDatabase(MailRule rule)
        {
            string updateQuery = "UPDATE MailRule SET LastTriggeredAt = @lastTriggeredAt WHERE Id = @id";

            string connectionString = ConfigurationManager.ConnectionStrings["cs"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand command = new SqlCommand(updateQuery, connection))
                {
                    command.Parameters.AddWithValue("@lastTriggeredAt", rule.LastTriggeredAt);
                    command.Parameters.AddWithValue("@id", rule.Id);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}