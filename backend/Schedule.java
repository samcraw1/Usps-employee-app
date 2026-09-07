
@Entity
public class Schedule {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String BT;
    private boolean NS;
    private LocalDate date;

    public Schedule(String BT, boolean NS, String date) {}


    public String getBT() {
        return BT;
    }

    public void setBT(String BT) {
        this.BT = BT;
    }

    public boolean isNS() {
        return NS;
    }

    public void setNS(boolean NS) {
        this.NS = NS;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}