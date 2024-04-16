import 'package:autoskola/mvvm/app_routes.dart';
import 'package:autoskola/mvvm/view_model.abs.dart';
import 'package:rxdart/subjects.dart';

class AppointmentSchedulerState {
  final DateTime date = DateTime.now();
  final int index;

  AppointmentSchedulerState({
    this.index = 0,
  });

  AppointmentSchedulerState copyWith({int? index}) {
    return AppointmentSchedulerState(
      index: index ?? this.index,
    );
  }
}

class AppointmentSchedulerViewModel extends ViewModel {
  final _stateSubject = BehaviorSubject<AppointmentSchedulerState>.seeded(
    AppointmentSchedulerState(),
  );
  Stream<AppointmentSchedulerState> get state => _stateSubject;

  final _routesSubject = PublishSubject<AppRouteSpec>();
  Stream<AppRouteSpec> get routes => _routesSubject;

  void changeIndex(int newIndex) {
    _updateState(newIndex);
  }

  void _updateState(int newIndex) {
    final state = _stateSubject.value;
    _stateSubject.add(
      state.copyWith(index: newIndex),
    );
  }

  @override
  void dispose() {
    _stateSubject.close();
    _routesSubject.close();
  }
}
