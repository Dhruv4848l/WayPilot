const sequelize = require('../config/db');

// Import all models
const User = require('./User');
const City = require('./City');
const Activity = require('./Activity');
const Trip = require('./Trip');
const Stop = require('./Stop');
const StopActivity = require('./StopActivity');
const Expense = require('./Expense');
const Checklist = require('./Checklist');
const ChecklistCategory = require('./ChecklistCategory');
const ChecklistItem = require('./ChecklistItem');
const Note = require('./Note');
const Post = require('./Post');
const Comment = require('./Comment');
const PostLike = require('./PostLike');

// ═══════════════════════════════════
//  ASSOCIATIONS (Foreign Keys)
// ═══════════════════════════════════

// ── City → Activity (One-to-Many) ──
City.hasMany(Activity, { foreignKey: 'cityId', as: 'activities' });
Activity.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

// ── User → Trip (One-to-Many) ──
User.hasMany(Trip, { foreignKey: 'userId', as: 'trips' });
Trip.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ── Trip → Stop (One-to-Many) ──
Trip.hasMany(Stop, { foreignKey: 'tripId', as: 'stops', onDelete: 'CASCADE' });
Stop.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

// ── City → Stop (One-to-Many) ──
City.hasMany(Stop, { foreignKey: 'cityId', as: 'stops' });
Stop.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

// ── Stop ↔ Activity (Many-to-Many through StopActivity) ──
Stop.hasMany(StopActivity, { foreignKey: 'stopId', as: 'stopActivities', onDelete: 'CASCADE' });
StopActivity.belongsTo(Stop, { foreignKey: 'stopId', as: 'stop' });
Activity.hasMany(StopActivity, { foreignKey: 'activityId', as: 'stopActivities' });
StopActivity.belongsTo(Activity, { foreignKey: 'activityId', as: 'activity' });

// ── Trip → Expense (One-to-Many) ──
Trip.hasMany(Expense, { foreignKey: 'tripId', as: 'expenses', onDelete: 'CASCADE' });
Expense.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

// ── Trip → Checklist (One-to-One or One-to-Many) ──
Trip.hasMany(Checklist, { foreignKey: 'tripId', as: 'checklists', onDelete: 'CASCADE' });
Checklist.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });
User.hasMany(Checklist, { foreignKey: 'userId', as: 'checklists' });
Checklist.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ── Checklist → ChecklistCategory (One-to-Many) ──
Checklist.hasMany(ChecklistCategory, { foreignKey: 'checklistId', as: 'categories', onDelete: 'CASCADE' });
ChecklistCategory.belongsTo(Checklist, { foreignKey: 'checklistId', as: 'checklist' });

// ── ChecklistCategory → ChecklistItem (One-to-Many) ──
ChecklistCategory.hasMany(ChecklistItem, { foreignKey: 'categoryId', as: 'items', onDelete: 'CASCADE' });
ChecklistItem.belongsTo(ChecklistCategory, { foreignKey: 'categoryId', as: 'category' });

// ── Trip → Note (One-to-Many) ──
Trip.hasMany(Note, { foreignKey: 'tripId', as: 'notes', onDelete: 'CASCADE' });
Note.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ── User → Post (One-to-Many) ──
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Trip.hasMany(Post, { foreignKey: 'tripId', as: 'posts' });
Post.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

// ── Post → Comment (One-to-Many) ──
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ── Post ↔ User Likes (Many-to-Many through PostLike) ──
Post.hasMany(PostLike, { foreignKey: 'postId', as: 'likes', onDelete: 'CASCADE' });
PostLike.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
User.hasMany(PostLike, { foreignKey: 'userId', as: 'likes' });
PostLike.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ── User SavedDestinations (Many-to-Many through join table) ──
User.belongsToMany(City, { through: 'UserSavedCities', as: 'savedDestinations' });
City.belongsToMany(User, { through: 'UserSavedCities', as: 'savedByUsers' });

module.exports = {
  sequelize,
  User,
  City,
  Activity,
  Trip,
  Stop,
  StopActivity,
  Expense,
  Checklist,
  ChecklistCategory,
  ChecklistItem,
  Note,
  Post,
  Comment,
  PostLike,
};
