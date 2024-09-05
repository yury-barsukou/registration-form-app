import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Condition.text;

public class SignUpFormE2ETests {

    @BeforeAll
    public static void setUp() {
        Configuration.baseUrl = "http://localhost:3000";
        Configuration.startMaximized = true;
    }

    @Test
    public void testSuccessfulSignUp() {
        Selenide.open("/signup");
        $("#email").setValue("testuser@example.com");
        $("#password").setValue("strongpassword");
        $("#confirmPassword").setValue("strongpassword");
        $("#personalDetails").setValue("Test User");
        $("#signUpButton").click();
        $("#notification").shouldBe(visible).shouldHave(text("Verify your email"));
    }

    @Test
    public void testEmailUniqueness() {
        Selenide.open("/signup");
        $("#email").setValue("existinguser@example.com");
        $("#password").setValue("password");
        $("#confirmPassword").setValue("password");
        $("#personalDetails").setValue("Existing User");
        $("#signUpButton").click();
        $("#error").shouldBe(visible).shouldHave(text("Email is already in use"));
    }

    // Additional tests for password strength, mandatory fields, etc. can be added here

}