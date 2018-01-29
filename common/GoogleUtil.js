/**
 * Created by HungDang on 8/25/2017.
 */
import Geocoder from 'react-native-geocoding';
class GoogleUtil {
    static getGeoCoder() {
        Geocoder.setApiKey('AIzaSyBBq7cGdrBAwlTRcsWMZZGDMF7YZBI4-cE');
        return Geocoder;
    }
}
module.exports = GoogleUtil;
