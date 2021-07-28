using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using RepairTrack.Models;
using RepairTrack.Repositories;


namespace RepairTrack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("GetById/{Id}")]
        public IActionResult GetUserById(int id)
        {
            var userProfile = _userProfileRepository.GetByUserId(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet("GetCurrentUserType")]
        public IActionResult GetCurrentUserType()
        {
            var currentUserProfile = GetCurrentUserProfile();
            var currUserTypeName = currentUserProfile.UserType.Name;
            return Ok(currentUserProfile.UserType);
        }

        [HttpGet("GetCurrentUser")]
        public IActionResult GetCurrentUser()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(currentUserProfile);
        }

        //[HttpGet("Deactivated")]
        //public IActionResult GetAllDeactivatedUsers()
        //{
        //    return Ok(_userProfileRepository.GetAllDeactivated());
        //}

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            
            userProfile.UserTypeId = UserType.TECHNICIAN_ID;
            userProfile.IsActive = true;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("DeactivateUser/{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }
            userProfile.IsActive = false;
            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
