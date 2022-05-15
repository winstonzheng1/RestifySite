from django.contrib.auth import get_user_model
from rest_framework import serializers
##
#More info on serializers from rest_framework can be found at https://www.cdrf.co/3.12/rest_framework.serializers/Serializer.html
##


class UserSerializer(serializers.ModelSerializer):
    class Meta:  #standard meta for ModelSerializer defined in documentation
        model = get_user_model()
        fields = (
            'id', 'username', 'password', 'first_name', 'last_name', 'email',
            'phone_number', 'avatar'
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):  #create an instance from retrieved validated data
        instance = self.Meta.model(**validated_data)
        instance.set_password(validated_data.pop('password')) #pop the password from the validated data
        instance.save()  #always save, learned the hard way
        return instance

    def update(self, instance, validated_data):  #update an instance for validated data
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
        for key, value in validated_data.items():  #get dictionary of values of validated data for a user
            setattr(instance, key, value)  #update the data
        instance.save()
        return instance

    #override get_fields
    def get_fields(self):
        fields = super().get_fields()  #retrieve fields 
        if self.context.get('request', None) and self.context.get('request', None).method != 'POST':  #if not POST then fields are being requested for viewing purposes
            fields['username'].read_only = True  #username should be read only when viewed
        return fields

    def validate(self, attrs):
        if 'password' in attrs and len(attrs['password']) < 8:  #if password is less than 8 characters
            raise serializers.ValidationError(
                {'password': 'Passwords must be ATLEAST 8 characters'})
        return super().validate(attrs)
