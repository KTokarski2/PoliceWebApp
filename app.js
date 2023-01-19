var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var indexRouter = require('./routes/index');
const policeOfficerRouter = require('./routes/policeOfficerRoute');
const caseRouter = require('./routes/caseRoute');
const participationRouter = require('./routes/participationRoute');
const sequelizeInit = require('./config/sequelize/init');
const PoliceOfficerApiRouter = require('./routes/api/PoliceOfficerApiRoute');
const CaseApiRouter = require('./routes/api/CaseApiRoute');
const ParticipationApiRouter = require('./routes/api/ParticipationApiRoute');



sequelizeInit()
    .catch(err => {
      console.log(err);
    });

var app = express();

const fmt = require('./public/js/utils/dateFormatting');

app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

const authUtil = require('./util/authUtils');

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
})

app.use('/', indexRouter);
app.use('/PoliceOfficer', authUtil.permitAuthenticatedUser, policeOfficerRouter);
app.use('/Case', authUtil.permitAuthenticatedUser, caseRouter);
app.use('/Participation', authUtil.permitAuthenticatedUser, participationRouter);
app.use('/api/PoliceOfficer', authUtil.permitAuthenticatedUser, PoliceOfficerApiRouter);
app.use('/api/Case', authUtil.permitAuthenticatedUser, CaseApiRouter);
app.use('/api/Participation', authUtil.permitAuthenticatedUser, ParticipationApiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
