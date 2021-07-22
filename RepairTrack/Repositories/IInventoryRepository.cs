using System.Collections.Generic;
using RepairTrack.Models;

namespace RepairTrack.Repositories
{
    public interface IInventoryRepository
    {
        List<Inventory> GetAll();

    }
}