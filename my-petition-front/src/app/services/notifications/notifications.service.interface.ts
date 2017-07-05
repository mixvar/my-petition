abstract class INotificationsService {

  abstract success(message: string, duration?: number);

  abstract info(message: string, duration?: number);

  abstract error(message: string, duration?: number);

}

export default INotificationsService;
