// Selenide imports
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.SelenideElement;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Condition.visible;

// Page Object Model for SignInForm
public class SignInFormPage {
    private SelenideElement usernameInput = $("#username");
    private SelenideElement passwordInput = $("#password");
    private SelenideElement signInButton = $("#sign-in-button");

    public SignInFormPage enterUsername(String username) {
        usernameInput.val(username);
        return this;
    }

    public SignInFormPage enterPassword(String password) {
        passwordInput.val(password);
        return this;
    }

    public void clickSignIn() {
        signInButton.click();
    }
}

// Page Object Model for SignUpForm
public class SignUpFormPage {
    private SelenideElement emailInput = $("#email");
    private SelenideElement passwordInput = $("#password");
    private SelenideElement confirmPasswordInput = $("#confirm-password");
    private SelenideElement signUpButton = $("#sign-up-button");

    public SignUpFormPage enterEmail(String email) {
        emailInput.val(email);
        return this;
    }

    public SignUpFormPage enterPassword(String password) {
        passwordInput.val(password);
        return this;
    }

    public SignUpFormPage enterConfirmPassword(String confirmPassword) {
        confirmPasswordInput.val(confirmPassword);
        return this;
    }

    public void clickSignUp() {
        signUpButton.click();
    }
}

// End-to-end tests
public class AuthFeatureE2ETests {
    @BeforeAll
    public static void setup() {
        Configuration.startMaximized = true;
    }

    @Test
    public void testSuccessfulSignIn() {
        Selenide.open("/sign-in");
        new SignInFormPage().enterUsername("user").enterPassword("password").clickSignIn();
        $("#user-profile").shouldBe(visible);
    }

    @Test
    public void testSuccessfulSignUp() {
        Selenide.open("/sign-up");
        new SignUpFormPage().enterEmail("user@example.com").enterPassword("password").enterConfirmPassword("password").clickSignUp();
        $("#verification-email-sent").shouldBe(visible);
    }
}