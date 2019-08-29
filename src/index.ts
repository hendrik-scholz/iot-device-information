import { registerDeviceUsingMQTT } from './register/register';
import { startService } from './service/service';

registerDeviceUsingMQTT();
startService();
