
import models from '../db/models';
import returnProfile from '../helpers/returnProfileInformation';
import validateDate from '../helpers/validateDate';

export default class changeUserProfile {
  static getProfileInformation(request, response) {
    models.User.findOne({ where: { id: request.user.userId } })
      .then((myProfile) => {
        response.status(200).json({ status: 200, user: returnProfile(myProfile) });
      }).catch((error) => response.status(500).json({ status: 500, error }));
  }

  static changeMyProfileInfo(request, response) {
    request.body.birthDay = validateDate(request.body.birthDay);
    request.body.profileImage = (typeof request.file === 'undefined') ? null : `http://localhost:4000/${request.file.path}`;
    models.User.update(request.body, { where: { id: request.user.userId } })
      .then(() => models.User.findOne({ where: { id: request.user.userId } }))
      .then((user) => {
        response.status(200).json({ status: 200, user: returnProfile(user) });
      }).catch((dbError) => response.status(500).json({ error: 'Database issues', dbError }));
  }
}
