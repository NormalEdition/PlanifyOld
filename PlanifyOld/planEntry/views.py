from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from planEntry.models import AddTask
from planEntry.serializers import AddTaskSerializers

# Create your views here.
@csrf_exempt
def addTaskApi(request, id=None):
    if request.method == 'GET':
        if id is None:
            # Fetch all tasks
            addtask = AddTask.objects.all()
            addtask_serializer = AddTaskSerializers(addtask, many=True)
            return JsonResponse(addtask_serializer.data, safe=False)
        else:
            # Fetch tasks by alphanumeric id
            addtask = AddTask.objects.filter(level=id)  # Use filter instead of get
            if addtask.exists():
                addtask_serializer = AddTaskSerializers(addtask, many=True)
                return JsonResponse(addtask_serializer.data, safe=False)
            else:
                return JsonResponse(f"No tasks found with Level {id}.", safe=False, status=404)

    elif request.method == 'POST':
        addtask_data = JSONParser().parse(request)
        print(addtask_data)
        addtask_serializer = AddTaskSerializers(data=addtask_data)
        print(addtask_serializer)
        if addtask_serializer.is_valid():
            addtask_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)
    
    elif request.method == 'PUT':
        addtask_data = JSONParser().parse(request)

        if 'delFlg' in addtask_data and addtask_data['delFlg'] == 'Y':
            # If delFlg is provided and set to 'Y', only update delFlg
            try:
                addtask = AddTask.objects.get(ids=id)
                addtask.delFlg = 'Y'  # Set delFlg to 'Y'
                addtask.save()
                return JsonResponse("delFlg set to Y successfully!", safe=False)
            except AddTask.DoesNotExist:
                return JsonResponse(f"Task with ID id not found.", safe=False, status=404)
            
        if 'compFlg' in addtask_data and addtask_data['compFlg'] == 'Y':
            # If compFlg is provided and set to 'Y', only update compFlg
            try:
                addtask = AddTask.objects.get(ids=id)
                addtask.compFlg = 'Y'  # Set compFlg to 'Y'
                addtask.save()
                return JsonResponse("compFlg set to Y successfully!", safe=False)
            except AddTask.DoesNotExist:
                return JsonResponse(f"Task with ID id not found.", safe=False, status=404)        

        else:
            # Handle full update (existing PUT method)
            try:
                addtask = AddTask.objects.get(ids=addtask_data['ids'])
                addtask_serializer = AddTaskSerializers(addtask, data=addtask_data)
                if addtask_serializer.is_valid():
                    addtask_serializer.save()
                    return JsonResponse("Updated Successfully!!", safe=False)
                else:
                    return JsonResponse("Failed to Update.", safe=False)
            except AddTask.DoesNotExist:
                return JsonResponse(f"Task with ID {addtask_data['ids']} not found.", safe=False, status=404)

    elif request.method == 'DELETE':
        try:
            addtask = AddTask.objects.get(ids=id)
            addtask.delete()
            return JsonResponse("Deleted Successfully!!", safe=False)
        except AddTask.DoesNotExist:
            return JsonResponse(f"Task with ID {id} not found.", safe=False, status=404)
