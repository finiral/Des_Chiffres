using System.Data;
using API.Objets;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/game")]
    public class GameController : ControllerBase
    {
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        [Route("randoms")]
        public List<int> GetRandoms()
        {
            List<int> randomNumbers = new List<int>();
            Random random = new Random();

            for (int i = 0; i < 7; i++)
            {
                randomNumbers.Add(random.Next(1, 101));
            }

            return randomNumbers;
        }

        [HttpGet]
        [Route("random")]
        public int GetRandom()
        {
            Random random = new Random();
            return random.Next(1, 1001);
        }

        [HttpPost]
        [Route("verifCalcul")]
        public bool IsCalculTrue([FromBody] Calculate c)
        {
            if (!c.IsValid())
            {
                return false;
            }
            string value = new DataTable().Compute(c.Calcul, null).ToString();
            if (c.Nombre.Equals(int.Parse(value)))
            {
                return true;
            }
            return false;
        }

        [HttpPost]
        [Route("decideStart")]
        public int DecideStart([FromBody] PlayerData[] datas)
        {
            int res = -1;
            if (datas[0].NbGuess == datas[1].NbGuess)
            {
                int temps = -1;
                foreach (PlayerData data in datas)
                {
                    if (data.TimeLeft > temps)
                    {
                        res = data.IdPlayer;
                        temps = data.TimeLeft;
                    }
                }

            }
            else
            {
                int diff = int.MaxValue;
                foreach (PlayerData data in datas)
                {
                    if (Math.Abs(data.Nb - data.NbGuess) < diff)
                    {
                        res = data.IdPlayer;
                        diff = Math.Abs(data.Nb - data.NbGuess);
                    }
                }

            }
            return res;
        }
    }
}