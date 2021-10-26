const UserType = {
    ADMIN: 'admin',
    STUDENT: 'student'
}

const StudentStatus = {
    STUDYING: 'STUDYING',
    GRADUATED: 'GRADUATED',
    DROPPED: 'DROPPED',
    PRESERVED: 'PRESERVED',
}

const BaseStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}

const RequestType = {
    REGISTER_CLASS: 'REGISTER_CLASS',
    CANCEL_CLASS: 'CANCEL_CLASS',
    STUDENT_CONFIRM: 'STUDENT_CONFIRM',
    DROPOUT: 'DROPOUT',
    CANCEL_DROPOUT: 'CANCEL_DROPOUT',
}

const RequestStatus = {
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING'
}

module.exports = {
    UserType,
    StudentStatus,
    BaseStatus,
    RequestType,
    RequestStatus,
}