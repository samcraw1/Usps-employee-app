import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.Color;

public class SignInPage {
    private String username;
    private String password;
    private JFrame frame;
    private JPanel panel;
    private JLabel usernameLabel;
    private JLabel passwordLabel;
    private JButton submitButton;


    public SignInPage(String username, String password) {
        this.username = username;
        this.password = password;

        frame = new JFrame("Sign In Page");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        panel = new JPanel();

        usernameLabel = new JLabel("Username:");
        JTextField usernameText = new JTextField(15);
        panel.add(usernameLabel);
        panel.add(usernameText);

        passwordLabel = new JLabel("Password:");
        JPasswordField passwordText = new JPasswordField(15);
        panel.add(passwordLabel);
        panel.add(passwordText);

        panel.setBackground(Color.LIGHT_GRAY);



        submitButton = new JButton("Login");
        panel.add(submitButton);

        frame.add(panel);
        frame.setSize(550,100);
        frame.setVisible(true);

        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(usernameText.getText().equals(username) && passwordText.getText().equals(password)){
                    System.out.println("Login Successful");
                } else {
                    System.out.println("Login Failed");
                }
            }
        });

    }
}
