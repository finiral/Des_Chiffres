namespace API.Objets{
    public class PlayerData{
        private int idPlayer;
        private int nb;
        private int nbGuess;
        private int timeLeft;

        public PlayerData()
        {
        }

        public PlayerData(int idPlayer,  int nb ,int nbGuess, int timeLeft)
        {
            IdPlayer = idPlayer;
            Nb = nb;
            NbGuess = nbGuess;
            TimeLeft = timeLeft;
        }

        public int IdPlayer { get => idPlayer; set => idPlayer = value; }
        public int Nb { get => nb; set => nb = value; }
        public int NbGuess { get => nbGuess; set => nbGuess = value; }
        public int TimeLeft { get => timeLeft; set => timeLeft = value; }
    }
}