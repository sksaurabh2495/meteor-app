import { Meteor } from 'meteor/meteor';
import Comments from '/imports/api/comments';

function insertComment(title, user) {
  Comments.insert({ title, user, createdAt: new Date() });
}

Meteor.startup(() => {
  if (Comments.find().count() === 0) {
    insertComment(
      'Do the Tutorial',
      'user5'
    );

    insertComment(
      'Follow the Guide',
      'user7'
    );

    insertComment(
      'Read the Docs',
      'user8'
    );

    insertComment(
      'Buy Oranges',
      'user9'
    );
  }

});
