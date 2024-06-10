using System.Data;
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
        public bool IsCalculTrue(int nombre, string calcul, int idJoueur)
        {
            string value = new DataTable().Compute(calcul, null).ToString();
            if(nombre.Equals(int.Parse(value))){
                return true;
            }
            return false;
        }
    }
}