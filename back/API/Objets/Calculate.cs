using System.Text.RegularExpressions;

namespace API.Objets
{
    public class Calculate
    {
        private int nombre;
        private string calcul;

        private List<int> nbs;
        private int id;

        public Calculate()
        {
        }

        public Calculate(int nombre, string calcul, List<int> nbs, int id)
        {
            Nombre = nombre;
            Calcul = calcul;
            Nbs = nbs;
            Id = id;
        }
        public int Id { get => id; set => id = value; }
        public int Nombre { get => nombre; set => nombre = value; }
        public string Calcul { get => calcul; set => calcul = value; }
        public List<int> Nbs { get => nbs; set => nbs = value; }
        

        public static List<int> ExtractNumbers(string input)
        {
            List<int> numbers = new List<int>();
            string pattern = @"\d+";
            MatchCollection matches = Regex.Matches(input, pattern);

            foreach (Match match in matches)
            {
                numbers.Add(int.Parse(match.Value));
            }

            return numbers;
        }
        public bool IsValid()
        {
            /// Verifier que l'expression soit arithmetique
            if(!ArithmeticExpressionValidator.IsValidArithmeticExpression(this.Calcul)){
                return false;
            }
            // Extract numbers from the input string
            List<int> lsNb = ExtractNumbers(this.Calcul);

            // Make a copy of the nbs list
            List<int> nbsCopy = new List<int>(this.Nbs);

            // Check if each number in lsNb is in the copy of nbs
            foreach (int number in lsNb)
            {
                if (nbsCopy.Contains(number))
                {
                    nbsCopy.Remove(number);
                }
                else
                {
                    return false;
                }
            }

            return true;
        }
    }
}