import org.eclipse.jetty.websocket.api.Session;
import org.json.JSONObject;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Theramin {
    static Map<Session, String> userUsernameMap = new ConcurrentHashMap<>();
    public static int nextUserNumber;

    public static void broadcastMessage(String userId, String message, String type) {
        userUsernameMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
            try {
                String jsonString = String.valueOf(new JSONObject().put("message", message).put("type", type).put("user", userId));
                System.out.println(jsonString);
                session.getRemote().sendString(
                        jsonString
                );
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
