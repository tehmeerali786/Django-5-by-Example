from cart.cart import Cart 
from django.shortcuts import redirect, render
from .forms import OrderCreateForm 
from .models import OrderItem
from .tasks import order_created

# Create your views here.

def order_create(request):
	cart = Cart(request)
	if request.method == 'POST':
		form = OrderCreateForm(request.POST)
		if form.is_valid():
			order = form.save()
			for item in cart:
				OrderItem.objects.create(

						order=order,
						product=item['product'],
						price = item['price'],
						quantity_models = item['quantity_models'],

					)
			# clear the cart
			cart.clear()
			# launch asynchronous task
			order_created.delay(order.id)
			# Set the order in the session
			request.session['order_id'] = order.id 
			# redirect for payment
			return redirect('payment:process')
			
	else:
		form = OrderCreateForm()

	return render(
			request,
			'orders/order/create.html',
			{'cart': cart, 'form': form}
		)


