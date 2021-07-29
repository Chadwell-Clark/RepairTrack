using System.Collections.Generic;
using RepairTrack.Models;

namespace RepairTrack.Repositories
{
    public interface IInventoryRepository
    {
        List<Inventory> GetAll();

        Inventory GetById(int id);
        int Add(Inventory inventory);

        void Update(Inventory inventory);

        void Delete(int id);


    }
}