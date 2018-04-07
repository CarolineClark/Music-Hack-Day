import static spark.Spark.*;

public class Main {

    public static void main(String[] args) {
//        launchChat();
        launchTheramin();
        init();
    }

    private static void launchTheramin() {
        staticFileLocation("/theramin");
        webSocket("/theramin", TheraminSocketHandler.class);
    }

    private static void launchChat() {
        staticFileLocation("/chat");
        webSocket("/chat", ChatWebSocketHandler.class);
    }
}
