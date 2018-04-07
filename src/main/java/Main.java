import static spark.Spark.*;

public class Main {

    public static void main(String[] args) {
        launchTheramin();
        init();
    }

    private static void launchTheramin() {
        staticFileLocation("/theramin");
        webSocket("/theramin", TheraminSocketHandler.class);
    }
}
