import 'package:autoskola/mvvm/view.abs.dart';
import 'package:autoskola/ui_components/Sepparator.dart';
import 'package:autoskola/ui_components/appointment_scheduler/appointment_scheduler_vm.dart';
import 'package:flutter/material.dart' hide View;
import 'package:flutter_slidable/flutter_slidable.dart';

class AppointmentScheduler extends View<AppointmentSchedulerViewModel> {
  // TODO: implemnt skeleton loader fails on fetching data and implement fetching logic with vm over interface
  const AppointmentScheduler(
      {required AppointmentSchedulerViewModel viewModel, Key? key})
      : super.model(viewModel, key: key);

  @override
  _AppointmentSchedulerState createState() =>
      _AppointmentSchedulerState(viewModel);
}

class _AppointmentSchedulerState
    extends ViewState<AppointmentScheduler, AppointmentSchedulerViewModel> {
  _AppointmentSchedulerState(AppointmentSchedulerViewModel viewModel)
      : super(viewModel);

  @override
  void initState() {
    super.initState();
    listenToRoutesSpecs(viewModel.routes);
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<AppointmentSchedulerState>(
      stream: viewModel.state,
      builder: (context, snapshot) {
        if (!snapshot.hasData) return Container();

        final state = snapshot.data!;

        return Container(
          width: double.infinity,
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.black,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Column(
            children: [
              Scrollbar(
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: List.generate(
                      7,
                      (index) {
                        final date = state.date.add(Duration(days: index));
                        final bool isSelected = index == state.index;

                        return Container(
                          margin: const EdgeInsets.all(8),
                          child: TextButton(
                            onPressed: () {
                              viewModel.changeIndex(index);
                            },
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                Theme.of(context)
                                    .colorScheme
                                    .primary
                                    .withOpacity(isSelected ? 1 : 0.5),
                              ),
                              shape: MaterialStateProperty.all<
                                  RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(24.0),
                                ),
                              ),
                            ),
                            child: Column(
                              children: List.generate(
                                2,
                                (index) {
                                  const weakDays = [
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thu',
                                    'Fri',
                                    'Sat',
                                    'Sun'
                                  ];
                                  final texts = [
                                    date.day.toString(),
                                    weakDays[date.weekday - 1]
                                  ];
                                  return Text(
                                    texts[index],
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: isSelected
                                          ? Colors.white
                                          : Theme.of(context)
                                              .colorScheme
                                              .primary,
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              Row(
                children: [
                  Container(
                    width: 10,
                    child: Sepparator(),
                  ),
                  Container(
                    padding: const EdgeInsets.all(8),
                    child: Text(
                      '12:15 - 12:45',
                      style: TextStyle(
                        color: Theme.of(context).colorScheme.primary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const Expanded(
                    child: Sepparator(),
                  ),
                ],
              ),
              ClipRect(
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.primary,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  padding: const EdgeInsets.all(8),
                  child: Slidable(
                    // Specify a key if the Slidable is dismissible.
                    key: const ValueKey(0),

                    // The start action pane is the one at the left or the top side.
                    startActionPane: ActionPane(
                      // A motion is a widget used to control how the pane animates.
                      motion: const ScrollMotion(),

                      // A pane can dismiss the Slidable.
                      // dismissible: DismissiblePane(onDismissed: () {}),

                      children: [
                        // A SlidableAction can have an icon and/or a label.
                        SlidableAction(
                          onPressed: (_) {},
                          backgroundColor: Color(0xFFFE4A49),
                          foregroundColor: Colors.white,
                          icon: Icons.event_busy,
                          label: 'Cancel',
                        ),
                      ],
                    ),

                    // The end action pane is the one at the right or the bottom side.
                    endActionPane: ActionPane(
                      motion: const ScrollMotion(),
                      children: [
                        SlidableAction(
                          // An action can be bigger than the others.
                          flex: 1,
                          onPressed: (_) {},
                          backgroundColor:
                              Theme.of(context).colorScheme.secondary,
                          foregroundColor: Colors.white,
                          icon: Icons.add_task,
                          label: 'Reserve',
                        ),
                      ],
                    ),

                    // The child of the Slidable is what the user sees when the
                    // component is not dragged.
                    child: ListTile(
                      leading: Column(
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                      title: Text(
                        "Dr. Jure Rajcic",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        "General practicioner M.D.",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                      trailing: Icon(
                        color: Colors.white,
                        Icons.swipe,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
